def test_get_state(client):
    rv = client.get('/get_state')
    assert rv.data is not None
