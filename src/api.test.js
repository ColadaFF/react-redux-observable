const api = require("./api")
// @ponicode
describe("api.requestDataFromServer", () => {
    test("0", () => {
        let callFunction = () => {
            api.requestDataFromServer("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            api.requestDataFromServer(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            api.requestDataFromServer("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            api.requestDataFromServer("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            api.requestDataFromServer(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            api.requestDataFromServer(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
