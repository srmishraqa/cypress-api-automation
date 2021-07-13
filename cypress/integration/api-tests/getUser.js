describe("GET calls - user tests", () => {
    it("GET Call - get all users", () => {

        cy.request({
            method: "GET",
            url: "https://gorest.co.in/public/v1/users",
            headers: {
                authorization:
                    "Bearer d7938d0a9e5dbd50ce0f9b2442ea92bc43554e7a515381480be02ec70ada37b0",
            }
        }).then((res) =>{
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it("GET Call - get single user by id - negative TC", () => {
        cy.request({
            method: "GET",
            url: "https://gorest.co.in/public-api/users/2",
            headers: {
                authorization:
                    "Bearer d7938d0a9e5dbd50ce0f9b2442ea92bc43554e7a515381480be02ec70ada37b0",
            }
        }).then((res) =>{
            expect(res.status).to.eq(200)
            expect(res.body.data.message).to.contain('not found')
        })
    })
})
