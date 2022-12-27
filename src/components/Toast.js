import * as Toast from "@radix-ui/react-toast";
import styled from "styled-components";

export default function Toasty({ habitsList, open, setOpen }) {
	return (
		<ToastCSS>
			<Toast.Provider>
				<Toast.Root
					className="toast-root"
					open={open}
					onOpenChange={setOpen}
				>
					<Toast.Title className="toast-title">
						Hábitos do dia
					</Toast.Title>
					<Toast.Description asChild>
						<div className="toast-description">{habitsList}</div>
					</Toast.Description>
					<Toast.Action asChild altText="Close">
						<div className="toast-action">
							<button>X</button>
						</div>
					</Toast.Action>
				</Toast.Root>
				<Toast.Viewport className="toast-viewport" />
			</Toast.Provider>
		</ToastCSS>
	);
}

const ToastCSS = styled.div`
	.toast-viewport {
		position: fixed;
		right: 50px;
		left: 50px;
		top: 50px;
		z-index: 99999;
	}
	.toast-root {
		background-color: white;
		border-radius: 6px;
		box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
			hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
		padding: 15px;
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		.toast-title {
			grid-column-start: 2;
			grid-row-start: 1;
			font-size: 18px;
			margin-bottom: 10px;
		}
		.toast-description {
			grid-column-start: 1;
			grid-column-end: 4;
			grid-row-start: 2;
			> p {
				font-size: 14px;
				color: #666666;
			}
			> p.done {
				color: #8fc549;
			}
			> p.undone {
				color: #ea5766;
			}
		}
		.toast-action {
			grid-column-start: 3;
			grid-row-start: 1;
			position: relative;
			> button {
				background-color: transparent;
				border: 1px dashed #52b6ff;
				border-radius: 5px;
				width: 25px;
				height: 25px;
				color: #52b6ff;
				font-size: 15px;
				font-weight: bold;
				position: absolute;
				top: -10px;
				right: -10px;
			}
		}
	}
	.toast-root[data-state="open"] {
		animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
	}
	.toast-root[data-state="closed"] {
		animation: hide 100ms ease-in;
	}
	.toast-root[data-swipe="move"] {
		transform: translateX(var(--radix-toast-swipe-move-x));
	}
	.toast-root[data-swipe="cancel"] {
		transform: translateX(0);
		transition: transform 200ms ease-out;
	}
	.toast-root[data-swipe="end"] {
		animation: swipeOut 100ms ease-out;
	}

	@keyframes hide {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-10%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes swipeOut {
		from {
			transform: translateX(var(--radix-toast-swipe-end-x));
		}
		to {
			transform: translateX(calc(100% + var(--viewport-padding)));
		}
	}
`;
