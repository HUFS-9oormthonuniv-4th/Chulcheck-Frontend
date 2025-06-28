export function PasteLink() {
  return (
    <section className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-bold text-gray-900 mb-1">초대 링크</h2>
      <p className="text-sm text-gray-600 mb-4">
        초대받은 링크를 붙여넣기 해주세요
      </p>
      <input
        type="text"
        placeholder="https://club-log.vercel.app/"
        className="w-full px-3 py-2 rounded-lg text-gray-700 text-sm outline-none border border-gray-300"
      />
    </section>
  );
}
