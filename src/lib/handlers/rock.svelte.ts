export const rock = $state({
	name: "",
	happiness: {
		affection: 0,
		nutrition: 0,
		total: 0
	}
});

export function decrease_affection() {
	if (rock.happiness.affection > 0) {
		rock.happiness.affection -= 1;
		console.log("Decreased affection by 1 to: ", rock.happiness.affection);
	}
}

export function decrease_nutrition() {
	if (rock.happiness.nutrition > 0) {
		rock.happiness.nutrition -= 1;
		console.log("Decreased nutrition by 1 to: ", rock.happiness.nutrition);
	}
}

export function save_rock() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem("rock", JSON.stringify(rock));
		console.log("Successfully saved rock as ", rock);
	} catch (error) {
		console.error("An error occurred when saving the rock name");
	}
}

export function load_rock() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		let stored = localStorage.getItem("rock");
		if (typeof stored === "string") {
			let parsed = JSON.parse(stored);
			rock.name = parsed["name"];
			rock.happiness.affection = parsed["affection"];
			rock.happiness.nutrition = parsed["nutrition"];
			rock.happiness.total = parsed["total"];
			console.log("Successfully loaded rock name as ", rock.name);
		}
	} catch (error) {
		console.error("An error occurred when saving the rock name");
	}
}
