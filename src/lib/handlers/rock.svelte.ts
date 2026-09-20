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
