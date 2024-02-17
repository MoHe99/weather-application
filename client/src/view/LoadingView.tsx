import { Oval } from 'react-loader-spinner';

export const LoadingView = () => {
	return (
		<div className='loading-overlay'>
			<Oval
				height={80}
				width={80}
				color='#8BB3B3'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
				ariaLabel='oval-loading'
				secondaryColor='#8bb3b354'
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</div>
	);
};

export default LoadingView;
