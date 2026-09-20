export enum Slot {
	Head,
	Neck
}

export class EquippableItem {
	id: string;
	name: string;
	price: number;
	slot: Slot;
	asset_path: string;

	constructor(id: string, name: string, price: number, slot: Slot, asset_path: string) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.slot = slot;
		this.asset_path = asset_path;
	}

	getPrettyStringified() {
		return `{ id: ${this.id}, name: ${this.name}, price: ${this.price}, slot: ${this.slot}, asset_path: ${this.asset_path} }`;
	}

	static fromJSON(JSON: any): EquippableItem {
		let slot = JSON["slot"];
		if (typeof slot === "number") slot = String(slot);
		if (typeof slot !== "string") {
			throw new Error(`Unsupported slot type: ${slot}`);
		}
		switch (slot.toLowerCase()) {
			case "0":
				slot = Slot.Head;
				break;
			case "1":
				slot = Slot.Neck;
				break;
			default:
				throw new Error(`Unsupported slot type: ${slot}`);
		}
		return new EquippableItem(JSON["id"], JSON["name"], Number(JSON["price"]), slot, JSON["asset_path"]);
	}
}

export const items: {
	possible_items: EquippableItem[];
	bought_items: EquippableItem[];
	equipped_items: EquippableItem[];
} = $state({
	possible_items: [],
	bought_items: [],
	equipped_items: []
});

export function load_bought_items() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		let stored = localStorage.getItem("bought_items") ?? "";
		if (stored === "") return;
		let parsed = JSON.parse(stored);
		for (const item of parsed) {
			items.bought_items.push(EquippableItem.fromJSON(item));
		}
		console.log(`Loaded bought items: [${items.bought_items.map((item) => item.getPrettyStringified()).join(",")}]`);
	} catch (error) {
		console.error("An error occurred fetching the bought items from localStorage: ", error);
		return;
	}
}

export function load_equipped_items() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		let stored = localStorage.getItem("equipped_items") ?? "";
		if (stored === "") return;
		let parsed = JSON.parse(stored);
		for (const item of parsed) {
			items.equipped_items.push(EquippableItem.fromJSON(item));
		}
		console.log(
			`Loaded equipped items: [${items.equipped_items.map((item) => item.getPrettyStringified()).join(",")}]`
		);
	} catch (error) {
		console.error("An error occurred fetching the equipped items from localStorage: ", error);
		return;
	}
}
