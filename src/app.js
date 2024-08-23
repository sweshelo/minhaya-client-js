import { MinhayaAPIClient } from "./client.mjs";

const main = async () => {
  const client = new MinhayaAPIClient(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  await client.initialize();

  if(client.accessToken){
    console.log(`Success! token: ${client.accessToken}`);
  }

  // TODO: 今のところ動かない
  const quiz = await client.getQuizById(0);
  console.log(quiz);
};

main().catch(console.error);