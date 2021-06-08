CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(50) NOT NULL PRIMARY KEY,
	password VARCHAR(100) NOT NULL,
	enabled BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS connection_session_canvas (
	connection_session_id VARCHAR(50) NOT NULL PRIMARY KEY,
	canvas_id int NOT NULL,
	CONSTRAINT fk_canvas_id
		FOREIGN KEY(canvas_id)
		REFERENCES canvases(canvas_id)
);

CREATE TABLE IF NOT EXISTS canvas_user_count (
	canvas_id int NOT NULL,
	active_users int not null,
	CONSTRAINT fk_canvas_id
		FOREIGN KEY(canvas_id)
		REFERENCES canvases(canvas_id)
);