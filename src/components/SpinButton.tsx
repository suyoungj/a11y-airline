import React, { useState, MouseEvent, useEffect } from 'react';
import './SpinButton.css';

const SpinButton: React.FC = () => {
	const [count, setCount] = useState<number>(0);
	const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
	const [announceText, setAnnounceText] = useState<string>();

	const increment = () => {
		setCount(prevCount => prevCount + 1);
		setAnnounceText(`성인 승객 추가 ${count + 1}`);
	};

	const decrement = () => {
		setCount(prevCount => prevCount - 1);
		setAnnounceText(`성인 승객 감소 ${count - 1}`);
	};

	const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
		setIsTooltipVisible(!isTooltipVisible);
	};

	useEffect(() => {
		if (announceText) {
			const liveRegion = document.getElementById('live-region');

			if (liveRegion) {
				liveRegion.textContent = announceText;
			}
		}
	}, [announceText]);

	return (
		<section className="spinButtonContainer">
			<div>
				<h1>승객 선택</h1>
				<div className="spinButtonLabel">
					<label>성인</label>
					<div
						role="tooltip"
						className="helpIcon"
						onMouseEnter={toggleTooltip}
						onMouseLeave={toggleTooltip}
					>
						?
						{isTooltipVisible && (
							<span className="tooltip">최대 인원수는 3명까지 가능합니다</span>
						)}
					</div>
				</div>
				<button
					onClick={decrement}
					className="spinButton"
					aria-label="성인 탑승자 한 명 줄이기"
					disabled={count === 0}
				>
					-
				</button>
				<input
					type="text"
					role="spinbutton"
					readOnly
					className="spinButtonInput"
					value={count}
					aria-label={`성인 ${count}`}
				/>
				<button
					onClick={increment}
					className="spinButton"
					aria-label="성인 탑승자 한 명 늘리기"
					disabled={count === 3}
				>
					+
				</button>
				<p
					id="live-region"
					className="hidden"
					aria-atomic="true"
					aria-live="assertive"
					aria-relevant="additions"
				/>
			</div>
		</section>
	);
};

export default SpinButton;
