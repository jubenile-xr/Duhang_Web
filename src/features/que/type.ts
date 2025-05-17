export type AllQueueSchema = {
	next_group: number[];
	next_next_group: number[];
	remaining_slots: number;
	total_wait_minutes: number;
};

export type MyQueueSchema = {
	my_id: number;
	waiting_time_minutes: number;
};
