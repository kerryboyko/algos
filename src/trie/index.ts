class TrieNode {
  public isWord: boolean = false;
  public numChildren: number = 0;
  private children: Record<string, TrieNode> = {};
  constructor(public letter: string | null = null) {}
  public getChild(char: string): TrieNode {
    return this.children[char];
  }
  public addChild(char: string): void {
    if (!this.children[char]) {
      this.children[char] = new TrieNode(char);
      this.numChildren += 1;
    }
  }
  public removeChild(char: string): void {
    if (!this.children[char]) {
      delete this.children[char];
      this.numChildren -= 1;
    }
  }
}

export default class Trie {
  private root: TrieNode = new TrieNode(null);
  constructor(
    private readonly caseInsensitive: boolean = false
  ) {}
  public insert(word: string): void {
    if (this.caseInsensitive) {
      word = word.toLowerCase();
    }
    let node: TrieNode = this.root;
    for (const char of word) {
      if (!node.getChild(char)) {
        node.addChild(char);
      }
      node = node.getChild(char);
    }
    node.isWord = true; // this will trigger for the last node;
  }
  public find(word: string): boolean {
    if (this.caseInsensitive) {
      word = word.toLowerCase();
    }
    let node: TrieNode = this.root;
    for (const char of word) {
      if (!node.getChild(char)) {
        return false;
      }
      node = node.getChild(char);
    }
    return node.isWord;
  }
  public delete(word: string) {
    if (this.caseInsensitive) {
      word = word.toLowerCase();
    }
    if (this.find(word)) {
      let path = [this.root];
      // create the path to the word.
      for (const char of word) {
        const child = path[path.length - 1].getChild(char);
        path.push(child);
      }
      path[path.length - 1].isWord = false;
      // deleted word may be a prefix, i.e. "car", "carpet"
      if (path[path.length - 1].numChildren > 0) {
        return;
      }
      // traverse upward until there's a fork.
      let idx = path.length - 1;
      let cursor = path[idx];
      let lastChar: string | null | undefined = undefined;
      while (cursor.numChildren <= 1 && !cursor.isWord && idx > 0) {
        lastChar = cursor.letter;
        idx -= 1;
        cursor = path[idx];
      }
      if (typeof lastChar === "string") {
        cursor.removeChild(lastChar);
      } else {
        throw new Error(
          `Cannot delete ${word} because an error was thrown in trying to traverse the path`
        );
      }
    }
  }
}
