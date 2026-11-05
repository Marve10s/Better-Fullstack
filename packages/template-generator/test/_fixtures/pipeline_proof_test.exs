defmodule BfsElixirProof.PipelineProofTest do
  use ExUnit.Case, async: false

  alias BfsElixirProof.{Numerics, Pipeline}

  setup do
    start_supervised!(Pipeline)
    :ok
  end

  test "the generated pipeline acknowledges a numerical payload without failures" do
    payload = %{
      mean: Numerics.mean([2, 4, 6]),
      probabilities: Numerics.softmax([0.0, 0.0])
    }

    ref = Broadway.test_message(Pipeline, payload)

    assert_receive {:ack, ^ref, [%Broadway.Message{data: received, status: :ok}], []}, 5_000
    assert received == %{mean: 4.0, probabilities: [0.5, 0.5]}
  end

  test "distinct test messages retain their acknowledgement references and data" do
    first_ref = Broadway.test_message(Pipeline, %{id: 1, values: [-2, 0, 2]})
    second_ref = Broadway.test_message(Pipeline, %{id: 2, values: [3, 6, 9]})

    assert_receive {:ack, ^first_ref, [%Broadway.Message{data: first, status: :ok}], []}, 5_000
    assert_receive {:ack, ^second_ref, [%Broadway.Message{data: second, status: :ok}], []}, 5_000
    assert first == %{id: 1, values: [-2, 0, 2]}
    assert second == %{id: 2, values: [3, 6, 9]}
  end
end
