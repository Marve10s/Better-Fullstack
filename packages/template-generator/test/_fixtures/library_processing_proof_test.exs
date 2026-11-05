defmodule BfsElixirProof.LibraryProcessingProofTest do
  use ExUnit.Case, async: false

  alias BfsElixirProof.{HTML, Numerics, Pipeline}

  test "parsed links and their computed mean survive the pipeline and supervised cache" do
    start_supervised!(Pipeline)

    document = """
    <html><body>
      <a href="/nx">Numerics</a>
      <img src="/ignored.png">
      <a>Missing href</a>
      <a href="/broadway">Pipeline</a>
    </body></html>
    """

    assert {:ok, links} = HTML.links(document)
    assert links == ["/nx", "/broadway"]
    mean_length = Numerics.mean(Enum.map(links, &String.length/1))
    assert_in_delta mean_length, 6.0, 1.0e-6

    ref = Broadway.test_message(Pipeline, %{links: links, mean_length: mean_length})

    assert_receive {:ack, ^ref, [%Broadway.Message{data: received, status: :ok}], []}, 5_000
    assert received == %{links: ["/nx", "/broadway"], mean_length: 6.0}

    key = {__MODULE__, make_ref()}
    assert {:ok, nil} = Cachex.get(:bfs_elixir_proof_cache, key)
    assert {:ok, true} = Cachex.put(:bfs_elixir_proof_cache, key, received)
    assert {:ok, ^received} = Cachex.get(:bfs_elixir_proof_cache, key)
  end
end
