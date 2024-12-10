import Trie from ".";

describe("Trie", () => {
    it("works with one word", () => {
      const oneWord = new Trie();
      oneWord.insert("word");
      expect(oneWord.find("word")).toBe(true);
      expect(oneWord.find("Word")).toBe(false);
      expect(oneWord.find("foo")).toBe(false);
      oneWord.delete("word");
      expect(oneWord.find("word")).toBe(false);
    });
    it("works with disjointed words", () => {
      const disjoint = new Trie();
      disjoint.insert("able");
      disjoint.insert("body");
      disjoint.insert("cat");
      expect(disjoint.find("able")).toBe(true);
      expect(disjoint.find("body")).toBe(true);
      expect(disjoint.find("cat")).toBe(true);
      disjoint.delete("body");
      expect(disjoint.find("able")).toBe(true);
      expect(disjoint.find("body")).toBe(false);
      expect(disjoint.find("cat")).toBe(true);
    });

    it("works with related words", () => {
      const related = new Trie();
      related.insert("many");
      related.insert("myself");
      related.insert("my");
      related.insert("able");

      expect(related.find("many")).toBe(true);
      expect(related.find("myself")).toBe(true);
      expect(related.find("my")).toBe(true);
      expect(related.find("able")).toBe(true);

      related.delete("myself");
      expect(related.find("many")).toBe(true);
      expect(related.find("myself")).toBe(false);
      expect(related.find("my")).toBe(true);
      expect(related.find("able")).toBe(true);
      related.insert("myself");
      related.delete("my");
      expect(related.find("many")).toBe(true);
      expect(related.find("myself")).toBe(true);
      expect(related.find("my")).toBe(false);
      expect(related.find("able")).toBe(true);
    });
    it('Works in Case INsensitive Mode', () => {
      const oneWord = new Trie(true);
      oneWord.insert("woRD");
      expect(oneWord.find("word")).toBe(true);
      expect(oneWord.find("Word")).toBe(true);
      expect(oneWord.find("foo")).toBe(false);
      oneWord.delete("word");
      expect(oneWord.find("word")).toBe(false);
      expect(oneWord.find("Word")).toBe(false);
    });
});
