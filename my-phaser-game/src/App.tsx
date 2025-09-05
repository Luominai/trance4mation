import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';

function App()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const planeRef = useRef<Phaser.GameObjects.Plane | null | undefined>(null)
    const meshRef = useRef<Phaser.GameObjects.Mesh | null | undefined>(null)
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    const moveSprite = () => {

        if(phaserRef.current)
        {

            const scene = phaserRef.current.scene as MainMenu;

            if (scene && scene.scene.key === 'MainMenu')
            {
                // Get the update logo position
                scene.moveLogo(({ x, y }) => {

                    setSpritePosition({ x, y });

                });
            }
        }

    }

    const addSprite = () => {

        if (phaserRef.current)
        {
            const scene = phaserRef.current.scene;

            if (scene)
            {
                // Add more stars
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
    
                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                const star = scene.add.sprite(x, y, 'star');
    
                //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
                //  You could, of course, do this from within the Phaser Scene code, but this is just an example
                //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
                scene.add.tween({
                    targets: star,
                    duration: 500 + Math.random() * 1000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1
                });
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    const createTexture = () => {
        if (!phaserRef.current) {
            return
        }
        if (!phaserRef.current.scene) {
            return
        }
        const scene = phaserRef.current.scene;
        var renderTexture = scene.make.renderTexture({
            x: 0, y: 0,
            width: 80, height: 40
        })
        var text = scene.make.text({
            x: 0, y: 0,
            padding: { x: 8, y: 8 },
            text: "example card",
            style: {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',  // 'left'|'center'|'right'|'justify'
                backgroundColor: '#ff00ff',
                fixedWidth: 80,
                fixedHeight: 40,
                wordWrap: {
                    width: 80
                }
            },
            add: true
        })
        renderTexture.draw(text)
        renderTexture.saveTexture('myTexture')
    }

    const addPlane = () => {
        if (!phaserRef.current) {
            return
        }
        if (!phaserRef.current.scene) {
            return
        }
        const scene = phaserRef.current.scene;
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        planeRef.current = scene.make.plane({
            add: true,
            x: x, y: y,
            key: 'bg',
            width: 1, height: 1
        })
        planeRef.current.ignoreDirtyCache = true

        const topLeft = [planeRef.current.vertices[0]]
        const topRight = [planeRef.current.vertices[2], planeRef.current.vertices[5]]
        const bottomLeft = [planeRef.current.vertices[1], planeRef.current.vertices[3]]
        const bottomRight = [planeRef.current.vertices[4]]

        const timeline = scene.add.timeline({})
        const duration = 1000
        const scale = 1.2

        timeline.add({
            tween: {
                targets: [...topLeft, ...topRight, ...bottomLeft, ...bottomRight],
                duration: duration,
                x: "*= -1"
            }
        })
        timeline.add({
            tween: {
                targets: [...topLeft, ...bottomLeft],
                duration: duration / 2,
                y: `*= ${scale}`
            }
        })
        timeline.add({
            tween: {
                targets: [...topRight, ...bottomRight],
                duration: duration / 2,
                y: `/= ${scale}`
            }
        })
        timeline.add({
            at: duration / 2,
            run: () => {
                planeRef.current?.setTexture('myTexture')
            }
        })
        timeline.add({
            at: duration / 2,
            tween: {
                targets: [...topLeft, ...bottomLeft],
                duration: duration / 2,
                y: `/= ${scale}`
            }
        })
        timeline.add({
            at: duration / 2,
            tween: {
                targets: [...topRight, ...bottomRight],
                duration: duration / 2,
                y: `*= ${scale}`
            }
        })

        timeline.play()
    }

    const addText = () => {
        if (!phaserRef.current) {
            return
        }
        if (!phaserRef.current.scene) {
            return
        }
        const scene = phaserRef.current.scene;
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);
        var rt = scene.make.renderTexture({
            x: 0,
            y: 0,
            width: 32,
            height: 32,
        });
        var txt = scene.make.text({
            x: x,
            y: y,
            padding: {
                x: 8,    // 32px padding on the left/right
                y: 8     // 16px padding on the top/bottom
            },
            text: 'Text\nGame Object\nCreated from config',
            style: {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',  // 'left'|'center'|'right'|'justify'
                backgroundColor: '#ff00ff',
                fixedWidth: 100,
                wordWrap: {
                    width: 80
                }
            },
            // origin: {x: 0.5, y: 0.5},
            add: true
        });
        console.log(txt)
        // rt.draw(txt)
        // rt.saveTexture('myRenderTexture')
        // console.log(scene.textures)

        // const text = scene.add.sprite(x, y, 'myRenderTexture');
        // console.log(text)
    }

    const addCard = () => {
        if (!phaserRef.current) {
            return
        }
        if (!phaserRef.current.scene) {
            return
        }
        const scene = phaserRef.current.scene;

        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        const backImageKey = 'star'

        var card = scene.make.plane({
            add: true,
            x: x,
            y: y,
            key: backImageKey,
            width: 1,
            height: 1
        })

        animateCardFlip(scene, card)
    }

    const addRenderTextureSprite = () => {
        if (!phaserRef.current) {
            return
        }
        if (!phaserRef.current.scene) {
            return
        }
        const scene = phaserRef.current.scene
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);
        const text = scene.add.sprite(x, y, 'myTexture');
    }

    const animateCardFlip = (scene: Phaser.Scene, card: Phaser.GameObjects.Plane) => {
        const frontImageKey = 'myTexture'

        const topLeft = [card.vertices[0]]
        const topRight = [card.vertices[2], card.vertices[5]]
        const bottomLeft = [card.vertices[1], card.vertices[3]]
        const bottomRight = [card.vertices[4]]

        const timeline = scene.add.timeline({})
        const duration = 1000
        const scale = 1.2

        card.ignoreDirtyCache = true

        timeline.add({
            tween: {
                targets: [...topLeft, ...topRight, ...bottomLeft, ...bottomRight],
                duration: duration,
                x: "*= -1"
            }
        })
        timeline.add({
            tween: {
                targets: [...topLeft, ...bottomLeft],
                duration: duration / 2,
                y: `*= ${scale}`
            }
        })
        timeline.add({
            tween: {
                targets: [...topRight, ...bottomRight],
                duration: duration / 2,
                y: `/= ${scale}`
            }
        })
        timeline.add({
            at: duration / 2,
            run: () => {
                card.setTexture(frontImageKey)
            }
        })
        timeline.add({
            at: duration / 2,
            tween: {
                targets: [...topLeft, ...bottomLeft],
                duration: duration / 2,
                y: `/= ${scale}`
            }
        })
        timeline.add({
            at: duration / 2,
            tween: {
                targets: [...topRight, ...bottomRight],
                duration: duration / 2,
                y: `*= ${scale}`
            }
        })

        timeline.play()
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
                </div>
                <div className="spritePosition">Sprite Position:
                    <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div>
                <div>
                    <button className="button" onClick={addSprite}>Add New Sprite</button>
                </div>
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button className="button" onClick={addPlane}>Add Plane</button>
                </div>
                <div>
                    <button className="button" onClick={addText}>Add Text</button>
                </div>
                <div>
                    <button className="button" onClick={addCard}>Add Card</button>
                </div>
                <div>
                    <button className="button" onClick={addRenderTextureSprite}>Add Render Texture Sprite</button>
                </div>
                <div>
                    <button className="button" onClick={createTexture}>Create Texture</button>
                </div>
            </div>
        </div>
    )
}

export default App
