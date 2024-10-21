import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../../../image/Jogos/FlappyChicken/PapeldeFundo/chapeubosch.png';
import birdImage from '../../../image/Jogos/FlappyChicken/PapeldeFundo/FrangoPixel2.png';

const FlappyBird = () => {
    const canvasRef = useRef(null); // Referência ao canvas
    const [passedPipes, setPassedPipes] = useState(0); // Pontos passados
    const [isPaused, setIsPaused] = useState(false); // Estado de pausa
    const [isGameOver, setIsGameOver] = useState(false); // Estado de fim de jogo

    // Frango
    const bird = { x: 50, y: 0, width: 95, height: 75 };
    const gravity = 0.1; // Gravidade
    const jumpVelocity = -4; // Velocidade do salto

    let velocity = 0; // Velocidade atual do passarinho
    const pipes = []; // Array para armazenar os tubos
    const pipeWidth = 50; // Largura dos tubos
    const pipeGap = 200; // Espaço entre os tubos
    let frameCount = 0; // Contador de frames
    let pipeSpeed = 2; // Velocidade dos tubos
    const maxPipeSpeed = 99999; // Velocidade máxima dos tubos

    // Função para resetar o jogo
    const resetGame = () => {
        setPassedPipes(0);
        setIsPaused(false);
        setIsGameOver(false);
        velocity = 0;
        pipes.length = 0; // Limpa os tubos
        frameCount = 0; // Reseta o contador de frames
        pipeSpeed = 2; // Reseta a velocidade dos tubos
        bird.y = canvasRef.current.height * 0.5; // Define a posição inicial do passarinho
    };

    useEffect(() => {
        const canvas = canvasRef.current; // Captura o canvas
        const context = canvas.getContext('2d'); // Contexto 2D do canvas

        const image = new Image(); // Cria uma nova imagem
        image.src = birdImage; // Define a fonte da imagem

        // Função para redimensionar o canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth; // Largura do canvas
            canvas.height = window.innerHeight; // Altura do canvas
            bird.y = canvas.height * 0.5; // Ajusta a posição do passarinho
        };

        window.addEventListener('resize', resizeCanvas); // Adiciona evento de redimensionamento
        resizeCanvas(); // Redimensiona o canvas ao montar o componente

        // Função para desenhar o passarinho
        const drawBird = () => {
            context.drawImage(image, bird.x, bird.y, bird.width, bird.height);
        };

        // Função para desenhar os tubos
        const drawPipes = () => {
            context.fillStyle = 'green'; // Cor dos tubos
            pipes.forEach(pipe => {
                // Desenha o tubo superior
                context.fillRect(pipe.x, 0, pipeWidth, pipe.height);
                // Desenha o tubo inferior
                context.fillRect(pipe.x, canvas.height - (canvas.height - pipe.height - pipeGap), pipeWidth, canvas.height - pipe.height - pipeGap);
            });
        };

        // Função para atualizar a posição dos tubos
        const updatePipes = () => {
            frameCount++; // Incrementa o contador de frames
            // Adiciona um novo tubo a cada 200 frames
            if (frameCount % 200 === 0) {
                const height = Math.random() * (canvas.height - pipeGap - 100) + 50; // Altura aleatória do tubo
                pipes.push({ x: canvas.width, height }); // Adiciona o tubo
            }

            // Atualiza a posição dos tubos
            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed; // Move o tubo para a esquerda
            });

            // Verifica se o passarinho passou pelo tubo
            pipes.forEach(pipe => {
                if (pipe.x + pipeWidth < bird.x && !pipe.passed) {
                    setPassedPipes(prev => prev + 1); // Incrementa a pontuação
                    pipe.passed = true; // Marca o tubo como passado
                    pipeSpeed = Math.min(pipeSpeed + 0.3, maxPipeSpeed); // Aumenta a velocidade dos tubos
                }
            });

            // Remove tubos que saíram da tela
            if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
                pipes.shift(); // Remove o primeiro tubo
            }
        };

        // Função para verificar colisões
        const checkCollision = () => {
            for (let pipe of pipes) {
                if (
                    bird.x < pipe.x + pipeWidth &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.height || bird.y + bird.height > canvas.height - (canvas.height - pipe.height - pipeGap))
                ) {
                    setIsGameOver(true); // Define jogo como finalizado em caso de colisão
                }
            }

            // Verifica se o passarinho caiu
            if (bird.y + bird.height > canvas.height) {
                setIsGameOver(true);
            }
        };

        // Função principal de desenho
        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
            drawBird(); // Desenha o passarinho
            drawPipes(); // Desenha os tubos

            // Atualiza a lógica do jogo se não estiver pausado ou se o jogo não acabou
            if (!isPaused && !isGameOver) {
                updatePipes(); // Atualiza a posição dos tubos
                checkCollision(); // Verifica colisões
                bird.y += velocity; // Atualiza a posição do passarinho
                velocity += gravity; // Aplica gravidade
            } else if (isGameOver) {
                // Exibe a mensagem de Game Over
                context.fillStyle = 'white';
                context.font = '48px Arial';
                context.fillText(`Game Over! Score: ${passedPipes}`, canvas.width / 2 - 150, canvas.height / 2);
            }

            requestAnimationFrame(draw); // Chama a função de desenho novamente
        };

        // Função para lidar com cliques
        const handleClick = () => {
            if (!isPaused && !isGameOver) {
                velocity = jumpVelocity; // Aplica a velocidade de salto
            }
        };

        // Função para lidar com a tecla espaço
        const handleSpacebar = (event) => {
            if (event.code === 'Space') {
                event.preventDefault(); // Previne o comportamento padrão
                if (!isPaused && !isGameOver) {
                    velocity = jumpVelocity; // Aplica a velocidade de salto
                }
            }
        };

        canvas.addEventListener('click', handleClick); // Adiciona evento de clique ao canvas
        window.addEventListener('keydown', handleSpacebar); // Adiciona evento de tecla

        draw(); // Inicia o loop de desenho

        // Limpeza dos eventos ao desmontar o componente
        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleSpacebar);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isPaused, isGameOver]); // Reexecuta o efeito quando os estados mudam

    // Função para recarregar a página
    const reloadPage = () => {
        window.location.reload();
    };

    return (


            <div
                className="flex flex-col justify-start items-start h-full text-white overflow-hidden"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                }}
            >
                {!isGameOver && (
                    <div className="absolute top-4 left-4 text-2xl font-bold">Score: {passedPipes}</div> // Exibe a pontuação
                )}
                <canvas ref={canvasRef} className="border border-black w-full h-full" /> {/* Canvas para o jogo */}
                {isGameOver && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <button
                            onClick={reloadPage} // Recarrega a página ao clicar no botão
                            className="bg-white text-blue-900 py-2 px-4 rounded"
                        >
                            Recarregar Página
                        </button>
                    </div>
                )}
            </div>

    );
};

export default FlappyBird;
