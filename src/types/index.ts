import React, { ReactNode } from 'react';

export interface ProviderProps {
	children: ReactNode;
}

export interface TableProps {
	column: string;
	setColumn: React.Dispatch<string>;
}
