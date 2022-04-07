export default function Checkout() {
  return (
    <div>
      <p>Checkout view</p>
    </div>
  );
}

export async function getServerSideProps() {
  //log that a user has visited the checkout page
  const visit = await fetch(
    `https://eecs4413-backend-production.up.railway.app/api/analytics/website/usage`,
    {
      method: "POST",
      body: JSON.stringify({
        ip_address: "1.27.0.0.0",
        event: 3,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }
  );
  return { props: { data: "cartVisit" } };
}
