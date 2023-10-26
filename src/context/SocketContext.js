import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { serverUrl } from '../config/config';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const url = `${serverUrl}/`;
	// const url = 'http://localhost:8080';
	const { socket, online } = useSocket(url);

	return (
		<SocketContext.Provider value={{ socket, online }}>
			{children}
		</SocketContext.Provider>
	);
};
