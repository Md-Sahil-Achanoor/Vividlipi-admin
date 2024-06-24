import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { twMerge } from 'tailwind-merge'

interface Props extends ReactQuillProps {
  customClass?: string
  classes?: string
  disable?: boolean
}

const Quill = ({ customClass = '', ...props }: Props) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  }
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]
  // const ref = useRef<any>(null);

  // useEffect(() => {
  //   if (props.disable) {
  //     ref.current.editor.enable(false); // undefined
  //   } else {
  //     ref.current.editor.enable(true); // undefined
  //   }
  //   // return () => {
  //   //   second
  //   // }
  // }, [props.disable]);
  // const ReactQuill = useMemo(
  //   () => dynamic(() => import("react-quill"), { ssr: false }),
  //   []
  // );

  return (
    <ReactQuill
      // ref={ref}
      modules={modules}
      formats={formats}
      className={twMerge('text-xs font-light min-h-[150px]', customClass)}
      readOnly={props.disable}
      {...props}
    />
  )
}

export default Quill
