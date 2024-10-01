import { useState } from "react"
import Dialog from "../Dialog"
import { X } from "@phosphor-icons/react"
import styles from "./style.module.css"
import { useAtomValue } from "jotai"
import { umiAtom } from "@/app/atoms/umiAtom"
import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi"
import { getUri } from "@/utils/getUri"
import { rpcEndpointAtom } from "@/app/atoms/rpcEndpointAtom"
export interface CreateBlueprintDialogProps {
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateBlueprintDialog({ showDialog = false, setShowDialog }: CreateBlueprintDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File>()
  const [busy, setBusy] = useState(false)
  const umi = useAtomValue(umiAtom)
  const rpc = useAtomValue(rpcEndpointAtom)

  const handleClose = () => {
    setShowDialog(false)
  }

  // Handle file input change
  const handleFileChange = (files: FileList) => {
      setFile(files[0])
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { } = e.target
    if (!name || !description || !file) {
        alert('Please fill out all fields.')
        return
    }

    setBusy(true)
    try {
      const umiImageFile = await createGenericFileFromBrowserFile(file)
      const [imgUri] = await umi.uploader.upload([umiImageFile])
      console.log('img?', getUri(rpc, imgUri))

      const uri = await umi.uploader.uploadJson({
        name,
        description: description,
        image: getUri(rpc, imgUri),
      })

      console.log('json', getUri(rpc, uri))

      setTimeout(() => {
        setBusy(false)
      }, 1000)

    } catch (e) {

      console.log(e)

      setBusy(false)
    }
  }

  return (
    <Dialog
      show={showDialog}
    >
      <div className="flex justify-center items-center">
        <div className="flex flex-col max-h-full max-w-[600px] border border-gray-500 bg-stone-800 p-5 gap-4 rounded-xl dark:border-gray-700 w-[600px]">
          <div className="header flex justify-between gap-4">
            <h1 className="text-3xl font-bold inline-flex w-auto">Create a new Blueprint</h1>
            <span className="cursor-pointer inline-flex" onClick={handleClose}><X size={32} /></span>
          </div>
          <form className="mx-auto w-full gap-4 flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full group gap-2 flex flex-col">
                <label htmlFor="bp_name" className="text-white-500">Name</label>
              <input type="text" name="name" id="bp_name" className="bg-stone-900 border border-stone-800 text-white text-sm rounded-lg block w-full p-2.5 dark:bg-stone-900 dark:placeholder-gray-400 dark:text-white outline-none focus:outline-none"
                placeholder=" "
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full group gap-2 flex flex-col">
                <label htmlFor="bp_description" className="text-white-500">Description</label>
              <input type="text" name="description" id="bp_description" className="bg-stone-900 border border-stone-800 text-white text-sm rounded-lg block w-full p-2.5 dark:bg-stone-900 dark:placeholder-gray-400 dark:text-white outline-none focus:outline-none"
                placeholder=" "
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full group gap-2 flex flex-col">
              <label htmlFor="image" className="text-white-500">Upload Image</label>
              <input className="block w-full text-sm text-white border border-stone-800 rounded-lg cursor-pointer bg-stone-900 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-stone-800" id="image" type="file" onChange={(e) => handleFileChange(e.target.files as FileList)} />
            </div>
            <div className="gap-4 flex justify-between">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
              <button type="submit" className={styles.createBtn} disabled={busy}>Create Blueprint</button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
}