import React, {useState} from 'react';

import {createStage} from '../gameHelpers';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

//Styled Components
import {StyledTetris} from './styles/StyledTetris';
import {StyledTetrisWrapper} from './styles/StyledTetris';

//Custom Hooks
import {usePlayer} from '../hooks/usePlayer';
import {useStage} from '../hooks/useStage';

const Tetris = () => {
    const [dropTime, setDroptime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayer] = usePlayer();
    const[stage, setStage] = useStage(player, resetPlayer);

    const movePlayer= dir => {
        updatePlayerPos({x: dir, y: 0})
    }

    
    const startGame = () => {
        //Resets Everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x: 0, y: 1, collided: false})
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({keyCode}) => {
        if(!gameOver) {
            if(keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode ===39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={ e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text='Level' />
                        </div>
                    )}
                    <StartButton onClick={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;