export function rover(input: string): string {

  const listOfInstructions = input.split('\n');

  const initialPosition = listOfInstructions[0];

  if (listOfInstructions.length === 1) {
    return initialPosition;
  }

  const instructions = listOfInstructions[1].split(' ');

  const finalPosition = instructions.reduce((acc, current) => {
    return processInstruction(acc, current);
  }, mapToPosition(initialPosition));

  return mapFromPosition(finalPosition);
}

function processMoveInstruction(initialPosition: Position, instruction: string) {
  const sign = ['n', 'e'].includes(initialPosition.facing) ? 1 : -1;
  const actualSign = instruction === 'f' ? sign : -sign;

  if (['n', 's'].includes(initialPosition.facing)) {
    return {
      ...initialPosition,
      y: initialPosition.y + actualSign
    };
  } else {
    return {
      ...initialPosition,
      x: initialPosition.x + actualSign
    };
  }
}

export function processInstruction(initialPosition: Position, instruction: string): Position {
  if (['f', 'b'].includes(instruction)) {
    return processMoveInstruction(initialPosition, instruction);
  }
  else {
    return {
      ...initialPosition,
      facing: instruction
    };
  }
}

export interface Position {
  x: number;
  y: number;
  facing: string;
}

export function mapToPosition(input: string): Position {
  const processed = input.split(' ');
  return {
    x: Number(processed[0]),
    y: Number(processed[1]),
    facing: processed[2]
  } as Position;
}

export function mapFromPosition(input: Position): string {
  return `${input.x} ${input.y} ${input.facing}`;
}
