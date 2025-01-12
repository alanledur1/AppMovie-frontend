import './page.scss';

export default function Sobre(): JSX.Element {
    return (
        <section className="sobre-content" aria-label="Sobre o App Movies">
            <h1>Sobre o App Movies</h1>
            <p>Este é um app de filmes e séries desenvolvido com o Next.js, TypeScript e Sass.</p>
            <p>Nosso objetivo é fornecer informações detalhadas sobre filmes e séries de forma rápida e eficiente.</p>
        </section>
    );
}