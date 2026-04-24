import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CharacterCreator from '@/components/CharacterCreator';

export default function CreateAvatarPage() {
  return (
    <>
      <Navbar variant="bg" />
      <CharacterCreator />
      <div className="container-space" />
      <Footer />
    </>
  );
}
