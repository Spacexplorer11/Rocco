enum Slot {
	Head,
	Neck
}

// DECLARATION: This code was made by Claude -------------

let avifSupport: boolean | null = null;
let webpSupport: boolean | null = null;

function supportsImageFormat(format: "webp" | "avif"): Promise<boolean> {
	const testImages: Record<"webp" | "avif", string> = {
		webp: "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
		avif: "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI="
	};
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img.width > 0);
		img.onerror = () => resolve(false);
		img.src = testImages[format];
	});
}

export async function initImageSupport(): Promise<void> {
	avifSupport = await supportsImageFormat("avif");
	webpSupport = await supportsImageFormat("webp");
}

// -----------------------------

export class EquippableItem {
	id: string;
	name: string;
	price: number;
	slot: Slot;
	asset_path: string;

	constructor(id: string, name: string, price: number, slot: Slot, asset_path: string) {
		// Why? When displaying it will use the png, webp and avif combo.
		if (/\.\w+$/.test(asset_path)) {
			throw new Error(`asset_path must not include a file extension: ${asset_path}`);
		}

		this.id = id;
		this.name = name;
		this.price = price;
		this.slot = slot;
		this.asset_path = asset_path;
	}

	getAssetPath(): string {
		if (typeof window === "undefined") return `${this.asset_path}.png`;
		if (avifSupport) {
			return `${this.asset_path}.avif`;
		} else if (webpSupport) {
			return `${this.asset_path}.webp`;
		} else {
			return `${this.asset_path}.png`;
		}
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
