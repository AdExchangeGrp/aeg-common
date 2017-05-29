// @flow

import async from 'async';
import Promise from 'bluebird';

type CallbackType = (err: ?Error) => void;
type DelegateType = (value: any, callback: CallbackType) => void;

/**
 * Run an array of promises with a set concurrency limit
 * @param {Object[]} arr
 * @param {number} limit
 * @param {Function} delegate
 */
export default async function eachLimit<T> (arr: T[], limit: number, delegate: (value: T) => ?Promise<void>): Promise<void> {

	const el: (arr: Array<any>, limit: number, DelegateType) => Promise<void> = Promise.promisify(async.eachLimit, {context: async});
	return el(arr, limit, (value, callback) => {

		Promise.resolve(delegate(value))
			.then(() => {

				callback();

				return null;

			})
			.catch((err) => {

				callback(err);

			});

	});

}
