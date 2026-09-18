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

class EquippableItem {
	id: string;
	name: string;
	price: number;
	slot: Slot;
	asset_path: string;

	constructor(id: string, name: string, price: number, slot: Slot | string, asset_path: string) {
		// Why? When displaying it will use the png, webp and avif combo.
		if (/\.\w+$/.test(asset_path)) {
			throw new Error(`asset_path must not include a file extension: ${asset_path}`);
		}
		if (typeof slot == "string") {
			switch (slot.toLowerCase()) {
				case "head":
					this.slot = Slot.Head;
					break;
				case "neck":
					this.slot = Slot.Neck;
					break;
				default:
					throw new Error(`Unsupported slot type: ${slot}`);
			}
		} else {
			this.slot = slot;
		}

		this.id = id;
		this.name = name;
		this.price = price;
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
		return `{ id: ${this.id}, name: ${this.name}, price: ${this.price}, slot: ${this.slot}, asset_path: ${this.asset_path} }r`;
	}
}

export const items: { possible_items: EquippableItem[]; bought_items: EquippableItem[] } = $state({
	possible_items: [new EquippableItem("top_hat", "Top Hat", 30, Slot.Head, "/items/top_hat")],
	bought_items: []
});

export function load_bought_items() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	try {
		let stored = localStorage.getItem("bought_items") ?? "";
		if (stored === "") return;
		let parsed = JSON.parse(stored);
		for (const item of parsed) {
			items.bought_items.push(
				new EquippableItem(
					item["id"],
					item["name"],
					Number(item["price"]),
					item["slot"],
					item["asset_path"]
				)
			);
		}
		console.log(
			`Loaded bought items: [${items.bought_items.map((item) => item.getPrettyStringified()).join(",")}]`
		);
	} catch (error) {
		console.error("An error occurred fetching the bought items from localStorage: ", error);
		return;
	}
}
