export function produceErrorData(error, others) {
	const { response } = error;
	const errData = response ?
		response.data :
		{
			message: error.message,
			//Others. . .
		};
	
	return {		
		err: {
			...others,
			...errData
		},
	};
}
