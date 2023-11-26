import Layout from "@/components/ui/Layout";
import styles from "./page.module.css";

const getMotivationalQuote = async () => {
  const QUOTES_API_URL = "https://zenquotes.io/api/random/confidence";
  try {
    const response = await fetch(QUOTES_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {}
};

export default async function HomePage() {
  const response = await getMotivationalQuote();

  let outputQuote = "Tall oaks grow from little acorns.";
  let outputAuthor = "Andrew Carnegie";
  if (response?.ok) {
    const result = await response.json();
    const { q: quote, a: author } = result?.[0] || {};
    outputQuote = quote;
    outputAuthor = author;
  }

  return (
    <Layout>
      <section className={styles.headingMd}>
        <h1>Gym Web App</h1>
        {outputAuthor !== "" && outputQuote !== "" && (
          <>
            <br />
            <br />
            <h2>Motivational quote for today:</h2>
            <br />
            <h3>
              <i>{'"' + outputQuote + '"'}</i>
            </h3>
            <br />
            <h5>
              <i>- {outputAuthor}</i>
            </h5>
          </>
        )}
      </section>
      <section>
        <p></p>
      </section>
    </Layout>
  );
}
