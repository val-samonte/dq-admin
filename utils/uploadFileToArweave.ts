import { getIrysClient } from "./getIrysClient"
import * as fs from "fs"

type uploadFileToArweaveProps = {
  filepath: string
  tags: {
    name: string
    value: string
  }[]
}

export const uploadFileToArweave = async ({ filepath, tags }: uploadFileToArweaveProps) => {
  const irys = getIrysClient();
  const file = fs.readFileSync(filepath);
  try {
    const { id } = await irys.upload(file, { tags })
    console.log("file uploaded to ", `https://arweave.net/${id}`)
    return id
  } catch (e) {
		console.log("Error uploading file ", e);
	}
}