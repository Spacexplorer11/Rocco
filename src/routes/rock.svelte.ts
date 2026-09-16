export let rock = $state({ name: "" });

export function save_rock_name() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem("rock_name", rock.name);
		console.log("Successfully saved rock name as ", rock.name);
	} catch (error) {
		console.error("An error occurred when saving the rock name");
	}
}

export function load_rock_name() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		rock.name = localStorage.getItem("rock_name") ?? "";
		console.log("Successfully loaded rock name as ", rock.name);
	} catch (error) {
		console.error("An error occurred when saving the rock name");
	}
}
