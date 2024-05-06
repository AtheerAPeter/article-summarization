import { spawnSync } from "child_process";

export async function POST(request: Request) {
  const body: { link: string } = await request.json();

  console.log(body);

  if (!body.link) {
    return new Response("No link provided", { status: 400 });
  }

  const pythonProcess = spawnSync("python3", ["./script.py"], {
    input: body.link,
    encoding: "utf-8",
  });

  if (pythonProcess.error) {
    console.error("Error executing Python script:", pythonProcess.error);
  }

  return new Response(
    JSON.stringify({
      text: pythonProcess.stdout,
    })
  );
}
