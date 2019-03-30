import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import { cleanup} from 'react-testing-library'

beforeEach(() => {
  jest.resetAllMocks()
})
afterEach(cleanup)

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: () => savedItems = {},
  getAll: () => {
    savedItems
  }
}

// This is needed as a workaround for this:
// let urlForCSV = window.URL.createObjectURL(blob)
// (https://github.com/jsdom/jsdom/issues/1721)
function noOp () { }
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: noOp})
}

window.localStorage = localStorageMock