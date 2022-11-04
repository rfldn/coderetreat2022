export function rover(input: string): string {
  const listOfInstructions = input.split('\n');
  const initialPosition = listOfInstructions[0];

  if (listOfInstructions.length === 1) {
    return initialPosition;
  }

  const instructions = listOfInstructions[1].split(' ');

  const finalPosition = instructions.reduce((position, instruction) => {
    return processInstruction(position, instruction);
  }, mapToPosition(initialPosition));

  return mapFromPosition(finalPosition);
}

function processMoveInstruction(initialPosition: Position, instruction: string) {
  const sign = ['n', 'e'].includes(initialPosition.facing) ? 1 : -1;
  const actualSign = instruction === 'f' ? sign : -sign;

  if (['n', 's'].includes(initialPosition.facing)) {
    return {
      ...initialPosition,
      coordinates: {
        ...initialPosition.coordinates,
        y: initialPosition.coordinates.y + actualSign
      }
    };
  }
  return {
    ...initialPosition,
    coordinates: {
      ...initialPosition.coordinates,
      x: initialPosition.coordinates.x + actualSign
    }
  };
}

export function processInstruction(initialPosition: Position, instruction: string): Position {
  if (['f', 'b'].includes(instruction)) {
    return processMoveInstruction(initialPosition, instruction);
  }
  return {
    ...initialPosition,
    facing: instruction
  };
}

interface Coordinates {
  x: number;
  y: number;
}

export interface Position {
  coordinates: Coordinates;
  facing: string;
}

export function mapToPosition(input: string): Position {
  const processed = input.split(' ');
  return {
    coordinates: {
      x: Number(processed[0]),
      y: Number(processed[1]),
    },
    facing: processed[2]
  } as Position;
}

export function mapFromPosition(input: Position): string {
  return `${input.coordinates.x} ${input.coordinates.y} ${input.facing}`;
}
