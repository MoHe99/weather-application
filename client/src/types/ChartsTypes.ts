export type Dataset = {
	label: string;
	data: number[];
	borderColor: string;
	backgroundColor: string;
};

export type ChartData = {
	labels: string[];
	datasets: Dataset[];
};

export type ExtremeValues = {
	min: number;
	max: number;
};

export type ChartOptions = {
	responsive: boolean;
	scales: {
		y: {
			min: number;
			max: number;
		};
	};
};
