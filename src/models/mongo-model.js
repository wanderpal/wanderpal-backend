class Model {

	/**
	 * Model constructor takes in schema
	 * @param schema
	 */
	constructor(schema) {
		this.schema = schema;
	}

	/**
	 * Gets a record based on ID
	 * @param _id
	 * @returns requested record's data
	 */
	get(_id) {
		let queryObject = _id ? {_id} : {};
		return this.schema.find(queryObject);
	}

	/**
	 * Returns all records based on ID
	 * example: all itineraries by a user or
	 * all days in a particular itinerary
	 * @param id object - example: { userId: id }
	 * @returns all records based on ID
	 */
	getAll(id) {
		return this.schema.find(id);
	}

	/**
	 * Posts (adds) a new record
	 * @param record
	 */
	post(record) {
		let newRecord = new this.schema(record);
		return newRecord.save();
	}

	/**
	 * Updates existing record based on ID
	 * @param _id
	 * @param record
	 * @returns updated record data
	 */
	put(_id, record) {
		return this.schema.findByIdAndUpdate(_id, record, {new:true});
	}

	/**
	 * Deletes record based on ID
	 * @param _id
	 * @returns deleted entry
	 */
	delete(_id) {
		return this.schema.findByIdAndDelete(_id);
	}

}

module.exports = Model;