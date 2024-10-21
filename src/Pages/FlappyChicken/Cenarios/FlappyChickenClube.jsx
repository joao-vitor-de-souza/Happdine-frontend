import React, { useEffect, useRef, useState } from 'react';

const FlappyBird = () => {
    const canvasRef = useRef(null);
    const [passedPipes, setPassedPipes] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Bird properties
    const bird = { x: 50, y: 0, width: 20, height: 20 };
    const gravity = 0.1;
    const jumpVelocity = -4;
    let velocity = 0;

    // Pipe properties
    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = 200;
    let frameCount = 0;
    let pipeSpeed = 2;

    const resetGame = () => {
        setPassedPipes(0);
        setIsPaused(false);
        velocity = 0;
        pipes.length = 0;
        frameCount = 0;
        pipeSpeed = 2;
        bird.y = canvasRef.current.height * 0.5;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.8;
            bird.y = canvas.height * 0.5;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const drawBird = () => {
            context.fillStyle = 'yellow';
            context.fillRect(bird.x, bird.y, bird.width, bird.height);
        };

        const drawPipes = () => {
            context.fillStyle = 'green';
            pipes.forEach(pipe => {
                context.fillRect(pipe.x, 0, pipeWidth, pipe.height);
                context.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, canvas.height - pipe.height - pipeGap);
            });
        };

        const updatePipes = () => {
            frameCount++;
            if (frameCount % 200 === 0) {
                const height = Math.random() * (canvas.height - pipeGap - 100) + 50;
                pipes.push({ x: canvas.width, height });
            }

            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed;
            });

            pipes.forEach(pipe => {
                if (pipe.x + pipeWidth < bird.x && !pipe.passed) {
                    setPassedPipes(prev => prev + 1);
                    pipe.passed = true;
                    pipeSpeed += 0.3;
                }
            });

            if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
                pipes.shift();
            }
        };

        const checkCollision = () => {
            for (let pipe of pipes) {
                if (
                    bird.x < pipe.x + pipeWidth &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeGap)
                ) {
                    resetGame();
                }
            }

            if (bird.y + bird.height > canvas.height) {
                resetGame();
            }
        };

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'red'; // Cor do fundo do jogo
            context.fillRect(0, 0, canvas.width, canvas.height); // Desenhar fundo
            drawBird();
            drawPipes();
            if (!isPaused) {
                updatePipes();
                checkCollision();
                bird.y += velocity;
                velocity += gravity;
            }

            requestAnimationFrame(draw);
        };

        draw();

        const handleClick = () => {
            if (!isPaused) {
                velocity = jumpVelocity;
            }
        };

        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (!isPaused) {
                    velocity = jumpVelocity;
                }
            }
        };

        canvas.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleSpacebar);

        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleSpacebar);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isPaused]);

    return (
        <div className="flex flex-col justify-start items-start h-screen bg-blue-900 text-white overflow-hidden relative">
            <div className="absolute top-4 left-4 text-2xl font-bold">Score: {passedPipes}</div>
            <canvas ref={canvasRef} className="border border-black w-full aspect-[16/9] max-h-[80vh] bg-blue-800" />
        </div>
    );
};

export default FlappyBird;
