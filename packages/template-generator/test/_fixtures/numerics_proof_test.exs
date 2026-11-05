defmodule BfsElixirProof.NumericsProofTest do
  use ExUnit.Case, async: true

  alias BfsElixirProof.Numerics

  test "mean computes integer and fractional tensor reductions" do
    assert_in_delta Numerics.mean([1, 2, 3, 4]), 2.5, 1.0e-6
    assert_in_delta Numerics.mean([-2.5, 0.5, 5.0]), 1.0, 1.0e-6
    assert_in_delta Numerics.mean([7]), 7.0, 1.0e-6
  end

  test "softmax computes ordered normalized probabilities" do
    assert [first, second, third] = Numerics.softmax([1.0, 2.0, 3.0])
    assert_in_delta first, 0.09003057, 1.0e-6
    assert_in_delta second, 0.24472847, 1.0e-6
    assert_in_delta third, 0.66524096, 1.0e-6
    assert_in_delta first + second + third, 1.0, 1.0e-6
  end

  test "softmax handles equal and singleton inputs" do
    assert [first, second, third] = Numerics.softmax([0.0, 0.0, 0.0])

    for probability <- [first, second, third] do
      assert_in_delta probability, 1.0 / 3.0, 1.0e-6
    end

    assert [probability] = Numerics.softmax([2.0])
    assert_in_delta probability, 1.0, 1.0e-6
  end
end
