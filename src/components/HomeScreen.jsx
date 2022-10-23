import { Header } from './HomeBoardScreen/Header';
import { HomeBoardScreen } from './HomeBoardScreen/HomeBoardScreen';

export const HomeScreen = () => {
	return (
		<div className='grid justify-items-center border-4  h-full pt-0 bg-gray-100'>
			<div className='w-3/4	bg-white border-1 '>
				<div>
					<Header />
				</div>

				<div className='border-solid border border-gray-400 h-5/6'>
					<HomeBoardScreen />
				</div>
			</div>
		</div>
	);
};
