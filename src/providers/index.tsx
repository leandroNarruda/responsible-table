import { TableContextProvider } from './Table';
import { ProviderProps } from '../types';

const Provider = ({ children }: ProviderProps) => {
	return <TableContextProvider>{children}</TableContextProvider>;
};
export default Provider;
