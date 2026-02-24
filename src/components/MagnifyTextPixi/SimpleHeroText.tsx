type Props = { text: string };

export default function SimpleHeroText({ text }: Props) {
  return (
    <h1 className="hero-simple-text">
      {text}
     
    </h1>
    
  );
}
