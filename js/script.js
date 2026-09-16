const reverb = new Tone.Reverb(0.5).toDestination();

const instrument = "piano";

const sampler = new Tone.Sampler({
	urls: {
		...instruments[instrument],
	},
	release: 1,
	baseUrl: `https://nbrosowsky.github.io/tonejs-instruments/samples/${instrument}/`,
}).chain(reverb);

const rings = ["1n", "2n", "3n", "4n", "5n", "6n", "7n", "8n"];
const octaves = [2, 3, 4];
const whenVariations = [
	0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.02,
];

const useRandomOctaves = false;

document.addEventListener("click", () => {
	song
		.map((chord) => {
			return chord.map((key) => {
				const [stringIndex, stringPosition] = key.split(":");
				if (stringIndex === "-1") return "PAUSE";

				return fretMapper(stringIndex, stringPosition);
			});
		})
		.forEach((chord, index) => {
			console.log(chord);
			if (chord.includes("PAUSE")) return;

			const randomRing = rings[Math.floor(Math.random() * rings.length)];
			const randomVariation =
				whenVariations[Math.floor(Math.random() * whenVariations.length)];
			const when = index * 0.2 + randomVariation;

			sampler.triggerAttackRelease(
				chord.map((item) => {
					if (!useRandomOctaves) return item;
					const randomOctave =
						octaves[Math.floor(Math.random() * octaves.length)];

					const parts = item.split("");
					parts[parts.length - 1] =
						Math.random() < 0.8 ? parts[parts.length - 1] : randomOctave;
					return parts.join("");
				}),
				randomRing,
				when,
			);
		});
});

document.addEventListener("click", () => {
	addTabs();
});
