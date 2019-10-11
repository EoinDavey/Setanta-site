# Interface design

The interface for the web-app will have to have the following main components.

## Code Editor

The large majority of the screen will have to be reserved for the code editor panel. There are 2 alternatives for this component

- A standard text editor. Probably using the [**Code Mirror**](https://codemirror.net).
- A visual text block editor using [Blockly](https://developers.google.com/blockly)

It might be possible to support both options, but allowing the user to switch between them poses an interesting question. Switching from a visual block representation to text should always be possible, as the block structure encodes a correct (if incomplete) syntax tree. However converting from text to the block format will be difficult if the text is not syntactically perfect.

## Stage display

The display where the user's stages will be drawn. Probably just a HTML5 `<canvas>` element.

## Console

I would also like there to be a normal text console, where the user can enter text and see text printed out. The language should allow the user to write code to read from the cli and print to the console. This will render use of the stage display optional.
