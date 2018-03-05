export default class DetailedError<TDetails> extends Error {

	public details: TDetails;
	public errorId: string | undefined;

	constructor (message: string, details: TDetails, errorId?: string) {

		super(message);

		// Remove this when we target es2015+
		Object.setPrototypeOf(this, DetailedError.prototype);

		this.details = details;
		this.errorId = errorId;

	}

}
