function Footer() {
  return (
    <footer className="flex justify-center mt-2">
      <div className="text-sm px-4 py-6">
        @ {new Date().getFullYear()} Gardener • Wszystkie prawa zastrzeżone
      </div>
    </footer>
  );
}

export default Footer;
