import SQLite from "react-native-sqlite-storage";

class GLDatabase {
	constructor() {
		this.db = undefined;
	}

	// Open our database
	openDB() {
		SQLite.DEBUG(true);
		SQLite.enablePromise(true);

		SQLite.openDatabase({
			name: "GLDatabase",
			location: "default"
		}).then((db) => {
			this.db = db;
			console.log('db opened');
			this.createTables();
		});
	}

	// Create our database tables
	async createTables() {
		// Create our Drink table
		await this.db.executeSql(`CREATE TABLE IF NOT EXISTS Drink(
			id INTEGER PRIMARY KEY NOT NULL,
			upc INTEGER NOT NULL,
			name TEXT,
			type TEXT,
			size INTEGER
		)`).then((result) => {
			console.log('Drink created');
			console.log(result);
		}).catch(() => console.log('failed to create Drink'));

		// Create our Recipe table
		await this.db.executeSql(`CREATE TABLE IF NOT EXISTS Recipe(
			id INTEGER PRIMARY KEY NOT NULL,
			name TEXT,
			description TEXT,
			instructions TEXT
		)`).then((result) => {
			console.log('Recipe created');
			console.log(result);
		}).catch(() => console.log('failed to create Drink'));

		// Create our Ingredient table, this will be the join table for our recipe ingredients
		await this.db.executeSql(`CREATE TABLE IF NOT EXISTS Ingredient(
			id INTEGER PRIMARY KEY NOT NULL,
			recipe_id INTEGER,
			type TEXT
		)`).then((result) => {
			console.log('Ingredient created');
			console.log(result);
		}).catch(() => console.log('failed to create Drink'));
	}

	// Close our database
	closeDB() {
		this.db.close();
	}

	// For testing purposes
	createTestData() {
	
		this.db.executeSql(`
			INSERT INTO Drink (upc, name, type, size) VALUES ('450', 'A test drink', '', '750')
		`).then((result) => {
			console.log('Drink inserted');
			console.log(result);
		});
	}
	
	// For testing purposes
	getTestData() {

		this.db.executeSql(`
			SELECT * FROM Drink
		`, ).then((result) => {
			console.log('Drinks returned');
			console.log(result);
		});
	}
	
	// Get drinks from search parameter
	getDrinks() {

	}

	insertDrink() {

	}

}

export const database = new GLDatabase();