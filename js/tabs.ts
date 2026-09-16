// biome-ignore lint/correctness/noUnusedVariables: used
const addTabs = () => {
	Object.values(song).forEach((timingGroup) => {
		let longestDigit = 0;

		addPaddingToAllStrings();

		const usedStringIndexes = Object.values(timingGroup).map(
			(entry) => entry.split(":")[0],
		);

		Object.values(timingGroup).forEach((note) => {
			const [stringIndex, stringPosition] = note.split(":");
			if (stringPosition.length > longestDigit)
				longestDigit = stringPosition.length;
			createStringNote(Number(stringIndex), stringPosition);
		});

		allStringIndexes.forEach((stringIndex, index) => {
			if (!usedStringIndexes.includes(stringIndex)) {
				for (let i = 0; i < longestDigit; i += 1) {
					createStringNote(index + 1);
				}
			}
		});
	});
};

const addPaddingToAllStrings = () => {
	allStringIndexes.forEach((_, index) => {
		createStringNote(index + 1);
	});
};

const allStringIndexes = ["1", "2", "3", "4", "5", "6"];

const createStringNote = (stringIndex, note = "—") => {
	const characters = note?.split("");
	const stringDiv = document.querySelector(`.string_${stringIndex}`);

	characters.forEach((character) => {
		ce.div(
			{ innerHTML: character?.replace(/-/g, "—"), className: "character" },
			stringDiv,
		);
	});
};
