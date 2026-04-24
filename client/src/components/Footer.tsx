import githubIcon from '@/assets/github-mark-white.png';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          <a href="https://github.com/TalonDragon000/Hom3Town" target="_blank" rel="noreferrer">
            <img src={githubIcon} width={25} alt="GitHub" />
          </a>
        </p>
        <p>&copy; 2023 Hom3Town. All rights reserved.</p>
      </div>
    </footer>
  );
}
