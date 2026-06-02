import type React from "react";
import { useEffect, useRef, useState } from "react";

interface CameraViewProps {
	onClose: () => void;
}

// const ASCII_CHARS = "@%#Dd*+=-:. ";
const ASCII_CHARS =
	"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,^`'. ";

const CameraView: React.FC<CameraViewProps> = ({ onClose }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ascii, setAscii] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let animationFrame: number;

		const startCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { width: 160, height: 120 },
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.play();
				}
			} catch (_err) {
				setError("Camera access denied or not available.");
			}
		};

		startCamera();

		const renderFrame = () => {
			if (videoRef.current && canvasRef.current) {
				const ctx = canvasRef.current.getContext("2d");
				if (ctx) {
					ctx.drawImage(videoRef.current, 0, 0, 160, 120);
					const imageData = ctx.getImageData(0, 0, 160, 120);
					const pixels = imageData.data;
					let asciiImage = "";

					for (let i = 0; i < pixels.length; i += 4) {
						const r = pixels[i];
						const g = pixels[i + 1];
						const b = pixels[i + 2];
						const brightness = (r + g + b) / 3;
						const charIndex = Math.floor(
							(brightness / 255) * (ASCII_CHARS.length - 1),
						);
						asciiImage += ASCII_CHARS[charIndex];

						if ((i / 4 + 1) % 160 === 0) {
							asciiImage += "\n";
						}
					}
					setAscii(asciiImage);
				}
			}
			animationFrame = requestAnimationFrame(renderFrame);
		};

		renderFrame();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "q") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener("keydown", handleKeyDown);
			if (videoRef.current?.srcObject) {
				const stream = videoRef.current.srcObject as MediaStream;
				for (const track of stream.getTracks()) {
					track.stop();
				}
			}
		};
	}, [onClose]);

	if (error) {
		return (
			<div className="text-red-500 font-mono p-4 border border-red-500">
				[ERROR]: {error}
				<br />
				Press 'q' to exit.
			</div>
		);
	}

	return (
		<div className="bg-black text-white p-4 font-mono border border-white/20 overflow-hidden animate-in fade-in duration-500 flex flex-col h-full">
			<div className="mb-4 text-xs leading-normal flex justify-between border-b border-white/20 pb-2">
				<span className="font-bold tracking-widest">CAMERA.SH v1.1.0</span>
				<button
					type="button"
					onClick={onClose}
					className="terminal-link px-2 bg-white text-black font-bold uppercase text-[10px]"
				>
					[ QUIT ]
				</button>
			</div>
			<div className="flex-grow flex items-center justify-center overflow-hidden">
				<pre className="whitespace-pre leading-[6px] text-[8px] md:text-[10px] md:leading-[8px] lg:text-[12px] lg:leading-[10px] text-center">
					{ascii}
				</pre>
			</div>
			<video ref={videoRef} className="hidden" playsInline muted />
			<canvas ref={canvasRef} className="hidden" width={160} height={120} />
		</div>
	);
};

export default CameraView;
